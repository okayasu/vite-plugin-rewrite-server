# vite-plugin-rewrite-server

rewrite request plugn for Vite.
work server and preview mode.

many code copied from vite-plugin-virtual-mpa.

## example
```yite.config.ts
inport { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { RewriteServe } from 'vite-plugin-rewrite-server';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		RewriteServe([
			{
				from: new RegExp('/admin/users/[0-9]+'),
				to: (_) => normalizePath('/admin/users/detail.html'),
			},
			{
				from: new RegExp('/admin/users/(.*)'),
				to: (ctx) => normalizePath(`/admin/users/${ctx.match[1]}`),
			}
		]),
	],
	base: '/admin/',

	// and more options...

});
```
