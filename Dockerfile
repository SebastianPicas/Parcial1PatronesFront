# Etapa 1: Construcción de la aplicación
FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación utilizando Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx ejecutará
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
