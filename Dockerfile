FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY static-html /usr/share/nginx/html/health-buddy

CMD nginx -g 'daemon off;'
