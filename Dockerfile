FROM pierrezemb/gostatic

COPY ./dist/ /srv/http/

ENTRYPOINT ["/goStatic", "-port", "9999", "-fallback", "/index.html"]
