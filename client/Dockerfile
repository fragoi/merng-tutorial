FROM httpd:2.4

RUN mkdir ./sites.conf.d

RUN echo "IncludeOptional ./sites.conf.d/*.conf" >> ./conf/httpd.conf

COPY ./docker/merng-client.conf ./sites.conf.d/merng-client.conf

COPY ./build/ ./htdocs/
