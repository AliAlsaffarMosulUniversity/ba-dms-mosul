import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('static assets ship security headers independently from API routing',async()=>{
 const headers=await readFile(new URL('../frontend/public/_headers',import.meta.url),'utf8');
 assert.ok(/^\/\*\r?\n/.test(headers));for(const rule of ["frame-ancestors 'none'",'X-Frame-Options: DENY','X-Content-Type-Options: nosniff','https://identitytoolkit.googleapis.com'])assert.ok(headers.includes(rule));
 const config=JSON.parse(await readFile(new URL('../wrangler.jsonc',import.meta.url),'utf8'));
 assert.equal(config.keep_vars,true);assert.deepEqual(config.assets.run_worker_first,['/api/*']);
});

