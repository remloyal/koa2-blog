import { Context } from 'koa';
import fs from 'fs';
import path from 'path';
import { dateFormart, randomStr } from '../utils/util';
import FileControl from '../moudels/resources/resource';

type filesitemtype = {
  filepath: string;
  size: number;
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  url: string;
};
type filestype = {
  url: string;
  size: number;
  mimetype: string;
  newFilename: string;
  originalFilename: string;
  filePath: string;
};

type fileData = {
  name: string;
  type: string;
  flie_path: string;
  suffix_name: string;
};

// 资源管理
export class ResourceController {
  // 获取全部
  public static async upload(ctx: Context) {
    const file: any = ctx.request.files;
    if (file.files instanceof Array) {
      // let files: Array<filestype> = [];
      const createData: Array<fileData> = [];
      for (let index = 0; index < file.files.length; index++) {
        const item: filesitemtype = file.files[index];
        const { filepath, size, mimetype, newFilename, originalFilename } = item;
        const basename = path.basename(filepath);
        const url = `${ctx.origin}/uploads/${basename}`;
        const filePath = await saveFileThis(item);
        const [name, suffix] = await handleSuffix(originalFilename);
        // files.push({ url, size, mimetype, newFilename, originalFilename, filePath });
        createData.push({
          name: name,
          type: mimetype,
          flie_path: filePath,
          suffix_name: suffix,
        });
      }
      const data = await FileControl.bulkCreate(createData);
      ctx.body = {
        start: 200,
        data: data,
        msg: '上传成功！',
      };
    } else {
      // let basename = path.basename(file.files.filepath);
      const filePath = await saveFileThis(file.files);
      const [name, suffix] = await handleSuffix(file.files.originalFilename);
      const data = await FileControl.create({
        name: name,
        type: file.files.mimetype,
        flie_path: filePath,
        suffix_name: suffix,
      });

      ctx.body = {
        start: 200,
        data: data,
        msg: '上传成功！',
      };
    }
  }
}

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
function checkDirExist(p: string) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true }); // 递归创建子文件夹
  }
}

/**
 * @description 抽离公共方法 校验单文件类型
 */
function validateFileType(file: any) {
  // @ts-ignore
  // console.log(file.originalFilename, file.filepath, file.mimetype)
  // @ts-ignore
  const fileType = file.mimetype;
  const typeSet = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'video/mp4',
    'video/webm',
    'video/x-msvideo',
    'audio/mpeg',
    'audio/ogg',
    'text/markdown',
    'application/json',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
  ]);
  if (!typeSet.has(fileType)) {
    return false;
  }
  return true;
}

/**
 * @description 抽离公共方法 存储单文件
 */
function saveFileThis(file: any) {
  // @ts-ignore
  const reader = fs.createReadStream(file.filepath); // 创建可读流
  // @ts-ignore
  const ext = path.extname(file.originalFilename);
  // 最终要保存到的文件夹目录
  const yyyyMMdd = dateFormart('yyyyMMdd'); // 目录： 年月日
  const lastDir = path.join(__dirname, '../..', `public/upload/${yyyyMMdd}`);
  checkDirExist(lastDir); // 检查文件夹是否存在如果不存在则新建文件夹
  const filePath = `/upload/${yyyyMMdd}/` + randomStr() + ext;
  const writer = fs.createWriteStream('public' + filePath); // 创建可写流
  reader.pipe(writer); // 可读流通过管道写入可写流
  return filePath;
}

/**
 * @description 判断文件、文件夹是否存在及删除的方法
 * @param {string} path 必传参数可以是文件夹可以是文件
 * @param {string} reservePath 保存path目录 path值与reservePath值一样就保存
 */
async function delFile(path: string, reservePath: string = '') {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let currentPath = path + '/' + file;
        if (fs.statSync(currentPath).isDirectory()) {
          delFile(currentPath, reservePath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      if (path != reservePath) {
        try {
          let fileList = await fs.readdirSync(path);
          // 清空文件夹内容之后之后删除文件夹
          if (fileList.length > 0) {
            setTimeout(() => {
              fs.rmdirSync(path);
            }, 100);
          } else {
            fs.rmdirSync(path);
          }
        } catch (error) {
          console.log('删除文件夹报错：', error);
        }
      }
    } else {
      await fs.unlinkSync(path);
    }
  }
}

/**
 * @description 处理后缀名
 * @param {string} name 必传参数
 * @return {}
 */
async function handleSuffix(name: string) {
  const data = await name.split('.');
  let firstname = '';
  for (let index = 0; index < data.length - 1; index++) {
    if (index == 0) {
      firstname += data[index];
    } else {
      firstname += `.${data[index]}`;
    }
  }
  return [firstname, data[data.length - 1]];
}
