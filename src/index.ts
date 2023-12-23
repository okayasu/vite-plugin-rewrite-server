import color from 'picocolors';
import { Plugin, ViteDevServer } from 'vite';
import history from 'connect-history-api-fallback';

export type RewriteRule = false | history.Rewrite[];

const packageName = 'vite-plugin-rewrite-server'
const verbose = true;

const useHistoryFallbackMiddleware = (
  middlewares: ViteDevServer['middlewares'],
  rewrites: RewriteRule = false,
) => {
  if (rewrites === false) return;

  middlewares.use(
    // @ts-ignore
    history({
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      rewrites
    }),
  );

  if (verbose) {
    middlewares.use((req, res, next) => {
      const { url, originalUrl } = req;
      if (originalUrl !== url) {
        console.log(
          `[${packageName}]: Rewriting ${color.blue(
            originalUrl,
          )} to ${color.blue(url)}`,
        );
      }
      next();
    });
  }
};

export const RewriteServe = (config: RewriteRule): Plugin => {
  return {
    name: packageName,
    configureServer: (server) => {
      useHistoryFallbackMiddleware(server.middlewares, config);
    },
    configurePreviewServer: (server) => {
      useHistoryFallbackMiddleware(server.middlewares, config);
    },
    apply: 'serve',
  };
};

export default RewriteServe;
