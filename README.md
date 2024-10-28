- # Vue3專案建置

  ## 專案建立

  1. 下載node.js(需14.18+、16+以上)
     - node -v : 檢查版本
     - npm install -g n : 更新到最新版
     - nvm is : 觀看已安裝版本
     - nvm use v18.16.1 : 切換版本 
  2. npm create vite@latest
  3. cd 切換到當前建立的專案
  4. npm install
  5. npm run dev

  

  ## 安裝項目

  1. npm install vue-router
  2. npm install element-plus
  3. npm install bootstrap@v5.3.3(npm install sass@1.64.2 因部分函式尚不支援，建議sass降到此版本)
  4. npm install vuex@next
  5. npm install axios(前後端串接)
  6. npm install jwt-decode(JWT驗證)

  

  ## CI/CD

  1. 先在該專案底下建立Dockerfile

  ```dockerfile
  FROM node:21.7.1-alpine AS build
  
  WORKDIR /app
  
  COPY package.json ./
  
  RUN npm install
  RUN npm install vue-router
  RUN npm install element-plus
  RUN npm install bootstrap@v5.3.3
  RUN npm install vuex@next
  RUN npm install axios
  
  COPY . ./
  
  EXPOSE 3000
  
  CMD ["npm","start"]
  ```

  - FROM - 從Docker Hub的哪個地方抓取image回來安裝

  - WORKDIR - 指定在容器啟動時我們會待在哪個容器

  - ENV -  定義在執行時的環境變量

  - RUN - 執行後方指令，像是在容器上執行 npm install

  - COPY - 複製${目前本機目標位置}到${容器目標位置}

  - EXPOSE - 輸出的Port 

  - CMD - 預設執行Container

  接著到CMD下指令，建立image

  docker build -t {image名稱}:{dev1.0(版本號)} - f Dockerfile .

  例 : docker build -t yaodockervue:dev1.0 -f Dockerfile .

  接著繼續在CMD下指令，建立container

  例 : docker run --name yaodockercontainer -p 3003:5173 yaodockervue:dev1.0

  **注意** :

  前端的package.json中，且相關port號要注意

  ```json
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  },
  
  "dev": "vite --host" 要添加--host
  ```

  
