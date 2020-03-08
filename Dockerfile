FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY static-html /usr/share/nginx/html

CMD nginx -g 'daemon off;'
