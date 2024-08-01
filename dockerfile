#Definir que tipo de aplicación vamos a crear
FROM node

#Definir donde se guardara la imagen i el nombre
WORKDIR /coderserver

#Copiar o mover el archivo package.json hacia el contenedor
COPY package*.json ./

#Limpiar cache e istalar los paquetes del json
RUN npm cache clean --force
RUN npm install

#Copiamos el resto de la aplicación
COPY . .

#Indicamos el puerto de exposición del contenedor / Es donde se levantará el contenedor
EXPOSE 8080

#Configurar el comando de inicialización de la aplicación
CMD [ "npm", "start" ]