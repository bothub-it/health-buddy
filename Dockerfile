FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY static-html /usr/share/nginx/html
RUN chmod -R 645 /usr/share/nginx/

CMD nginx -g 'daemon off;'
