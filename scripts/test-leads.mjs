// Behavioral tests run real route/form code in isolated modules with mocked delivery.
// No network request or production analytics call is possible in this harness.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file, mocks = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(code, {exports,require:(key)=>key in mocks ? mocks[key] : require(key),console:{info(){},error(){}},URLSearchParams,AbortSignal,Request,Response,...globals},{filename:file});
  return exports;
}
const lead = load('lib/lead.ts');
const translations = load('lib/i18n.ts').translations;
const valid = {name:'Local Test',phone:'202-555-0123',zip:'76180',need:'storm',locale:'en',pagePath:'/fort-worth/'};
let passed=0;
async function test(name, run) {await run(); console.log(`ok ${++passed} - ${name}`);}
function route(fetchMock, env={LEAD_WEBHOOK_URL:'http://127.0.0.1:1/mock'}) {
  return load('app/api/lead/route.ts', {'@/lib/lead':lead}, {fetch:fetchMock,process:{env}}).POST;
}
const request=(body=valid)=>new Request('http://127.0.0.1/api/lead',{method:'POST',body:JSON.stringify(body)});
await test('invalid form cannot call delivery',async()=>{const post=route(()=>assert.fail('delivery called'));assert.equal((await post(request({...valid,phone:'bad'}))).status,400);});
await test('missing delivery configuration fails honestly',async()=>{const post=route(()=>assert.fail('delivery called'),{});assert.equal((await post(request())).status,503);});
await test('upstream rejection cannot become an accepted lead',async()=>{const post=route(async()=>new Response('',{status:500}));assert.deepEqual(await (await post(request())).json(),{ok:false,error:'delivery_failed'});});
await test('upstream timeout cannot become an accepted lead',async()=>{const post=route(async()=>{throw new Error('timeout');});assert.equal((await post(request())).status,503);});
await test('successful delivery maps need and returns explicit acceptance',async()=>{let calls=0;const post=route(async(url,init)=>{calls++;assert.equal(url,'http://127.0.0.1:1/mock');assert.equal(JSON.parse(init.body).need,'Storm/hail');return new Response('',{status:201});});const res=await post(request());assert.equal(res.status,200);const result=await res.json();assert.equal(result.accepted,true);assert.match(result.lead_id,/^pw_/);assert.equal(calls,1);});
await test('honeypot returns benign success without delivery or acceptance',async()=>{const post=route(()=>assert.fail('delivery called'));const result=await (await post(request({...valid,honeypot:'bot'}))).json();assert.equal(result.ok,true);assert.equal(result.accepted,false);assert.match(result.lead_id,/^ignored_/);});
await test('rate limit rejects sixth request before delivery',async()=>{let calls=0;const post=route(async()=>{calls++;return new Response('',{status:200});});for(let i=0;i<5;i++)assert.equal((await post(request())).status,200);assert.equal((await post(request())).status,429);assert.equal(calls,5);});
// Hook harness exercises actual JSX event handlers without a DOM or live endpoint.
function form(file, fetchMock) {
  let cursor=0;const slots=[];const events=[];let requests=0;
  const hooks={useState(initial){const i=cursor++;if(!(i in slots))slots[i]=initial;return [slots[i],v=>slots[i]=v];},useRef(initial){const i=cursor++;if(!(i in slots))slots[i]={current:initial};return slots[i];},useMemo(fn){const i=cursor++;if(!(i in slots))slots[i]=fn();return slots[i];}};
  const mocks={'react':hooks,'@/lib/lead':lead,'next/navigation':{usePathname:()=>'/fort-worth/'},'@/lib/i18n':{translations},'@/lib/seo':{GOOGLE_MAPS_URL:'https://www.google.com/maps/place/test'},'@/components/providers/LanguageProvider':{useLanguage:()=>({locale:'en',t:translations.en})},'@/lib/analytics':{trackEvent:(...args)=>events.push(args)}};
  const Component=load(file,mocks,{window:{location:{search:'?utm_source=local_test'}},fetch:(url,init)=>{requests++;assert.equal(url,'/api/lead');return fetchMock(url,init);}}).default;
  let tree;
  const render=()=>{cursor=0;tree=Component({locale:'en'});return tree;};
  function nodes(node,out=[]) {if(!node||typeof node!=='object')return out;if(Array.isArray(node)){node.forEach(n=>nodes(n,out));return out;}out.push(node);nodes(node.props?.children,out);return out;}
  const find=(predicate)=>nodes(tree).find(predicate);
  render();
  if(file.includes('ChatWidget')){find(n=>n.props?.className==='pw-chat__launch').props.onClick();render();}
  const fill=(name,value)=>{find(n=>n.type==='input'&&n.props.name===name).props.onChange({target:{value}});render();};
  const ready=()=>{fill('name',valid.name);fill('phone',valid.phone);fill('zip',valid.zip);const radio=find(n=>n.props?.role==='radio');if(radio){radio.props.onClick();render();}};
  return {events,render,find,ready,fill,get requests(){return requests;},submit:()=>find(n=>n.type==='form').props.onSubmit({preventDefault(){}})};
}
for(const [file,source] of [['components/inspection/InspectionPreview.tsx','inspection_form'],['components/layout/ChatWidget.tsx','chat']]) {
  await test(`${source}: invalid input sends no request/event`,async()=>{const f=form(file,()=>assert.fail('fetch called'));await f.submit();assert.equal(f.requests,0);assert.equal(f.events.length,0);});
  await test(`${source}: accepted submission emits once, blocks concurrent and later submissions`,async()=>{let resolve;const f=form(file,()=>new Promise(r=>resolve=r));f.ready();const submit=f.submit();await f.submit();assert.equal(f.requests,1);resolve(new Response(JSON.stringify({ok:true,accepted:true}),{status:200}));await submit;assert.equal(f.events.length,1);assert.deepEqual(JSON.parse(JSON.stringify(f.events[0])),['generate_lead',{lead_source:source,need:source==='chat'?'check':'storm'}]);await f.submit();assert.equal(f.requests,1);const event=JSON.stringify(f.events);for(const pii of [valid.name,valid.phone,valid.zip,'utm_source','message'])assert.ok(!event.includes(pii));});
  for(const [label,status,payload] of [['failure',503,{ok:false}],['rate limit',429,{ok:false,error:'rate_limited'}],['unconfirmed response',200,{ok:true}]]) {
    await test(`${source}: ${label} emits nothing and permits retry`,async()=>{let fail=true;const f=form(file,async()=>new Response(JSON.stringify(fail?payload:{ok:true,accepted:true}),{status:fail?status:200}));f.ready();await f.submit();assert.equal(f.events.length,0);fail=false;await f.submit();assert.equal(f.requests,2);assert.equal(f.events.length,1);});
  }
  await test(`${source}: ignored spam cannot emit generate_lead`,async()=>{const f=form(file,async()=>new Response(JSON.stringify({ok:true,accepted:false}),{status:200}));f.ready();await f.submit();assert.equal(f.events.length,0);});
}
await test('GA bootstrap queues js/config before events only on production hosts',()=>{const {GA_BOOTSTRAP_SCRIPT}=load('lib/analytics.ts');for(const [host,expected] of [['www.praiseworthyroofing.com',2],['praiseworthyroofing.com',2],['127.0.0.1',0],['pw.vercel.app',0]]){const context={window:{},location:{hostname:host}};context.window=context;vm.runInNewContext(GA_BOOTSTRAP_SCRIPT,context);assert.equal(context.dataLayer.length,expected);if(expected){assert.equal(context.dataLayer[0][0],'js');assert.equal(context.dataLayer[1][0],'config');}}});
await test('one delegated click listener emits click-only events without link values',()=>{let listener;const events=[];let cleanups=0;const document={addEventListener:(name,fn)=>{assert.equal(name,'click');listener=fn;},removeEventListener:(name,fn)=>{assert.equal(fn,listener);cleanups++;}};let cleanup;const {ContactClickTracker}=load('components/analytics/ContactClickTracker.tsx',{'react':{useEffect:fn=>cleanup=fn()},'@/lib/analytics':{trackEvent:(...args)=>events.push(args)}},{document,window:{location:{pathname:'/fort-worth/'}}});ContactClickTracker();for(const href of ['tel:+16822500078','mailto:praiseworthyroofing@gmail.com','https://calendar.google.com/calendar/u/0/appointments/schedules/test','/#inspection-request-hero'])listener({target:{closest:()=>({getAttribute:()=>href})}});assert.deepEqual(events.map(e=>e[0]),['phone_click','email_click','booking_click']);assert.ok(!JSON.stringify(events).includes('682250'));assert.ok(!JSON.stringify(events).includes('@gmail'));assert.ok(!JSON.stringify(events).includes('https:'));cleanup();assert.equal(cleanups,1);});
console.log(`${passed} lead/tracking behavioral checks passed; all delivery and analytics mocked.`);
