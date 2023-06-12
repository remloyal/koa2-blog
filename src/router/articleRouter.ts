import { Context } from 'koa';
import Router from 'koa-router';
import Product from '../moudels/Product';

module.exports = (router: Router) => {
  // const { controller, router } = app;
  router.get('/allArticle', (ctx: Context) => {
    ctx.body = 'allArticle';
  });
  // router.get("/getArticle", controller.article.getArticle);
  router.post('/createArticle', async (ctx: Context) => {
    // const record = ctx.request.body;
    // const requestData = await parseRequestBody(ctx.req);
    // console.log(requestData);
    const res = await Product.findAll();

    ctx.body = 'createArticle';
  });

  // router.get("/deleteArticle", controller.article.deleteArticle);
  // router.post("/updateArticle", controller.article.updateArticle);
  // router.post("/getArticlePage", controller.article.getArticlePage);
};

function parseRequestBody(req: any) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      // 根据请求头的 Content-Type 判断数据格式
      if (req.headers['content-type'] === 'application/json') {
        // 解析 JSON 格式数据
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // 解析 URL 编码格式数据
        const parsedData: any = {};
        const keyValuePairs = data.split('&');
        for (const pair of keyValuePairs) {
          const [key, value] = pair.split('=');
          parsedData[key] = decodeURIComponent(value);
        }
        resolve(parsedData);
      } else {
        reject(new Error('Unsupported content type'));
      }
    });
    req.on('error', (error: any) => {
      reject(error);
    });
  });
}
