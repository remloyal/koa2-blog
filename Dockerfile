# FROM node:16

# # FROM mhart/alpine-node:16
# # FROM node
# # 安装 Python 和依赖
# # RUN apk add --no-cache python3 make g++ \
# #     && python3 -m ensurepip \
# #     && rm -r /usr/lib/python*/ensurepip \
# #     && pip3 install --upgrade pip setuptools \
# #     && if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi \
# #     && if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi \
# #     && rm -rf /var/cache/apk/*


# # RUN rm -rf node_modules \
# #     ; rm -rf logs \
# #     : rm -rf public 
# COPY . /app

# WORKDIR /app


# # RUN rm -f package-lock.json \
# #     ; rm -rf .idea \
# #     ; rm -rf node_modules \
# #     ; npm config set registry "https://registry.npm.taobao.org/" \
# #     && npm config set unsafe-perm true


# EXPOSE 8000

# # ENTRYPOINT ["npm", "install"]
# CMD ["npm","run", "dev"]

#制定node镜像的版本
FROM node:18.16.0-alpine
#声明作者
MAINTAINER robin
#移动当前目录下面的文件到app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 8000
#程序启动脚本
CMD ["npm","run", "dev"]