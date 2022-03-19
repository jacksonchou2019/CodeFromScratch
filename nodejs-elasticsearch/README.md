elasticsearch 7.10.2 安装在aws上
username:admin
password:Clickdishes.2020

endpoint:https://search-cds-search-fqgynf7qdjrteyoswsm5ea7nbq.us-west-2.es.amazonaws.com
domain: cds-search

curl -XPUT -u 'admin:Clickdishes.2020' 'https://search-cds-search-fqgynf7qdjrteyoswsm5ea7nbq.us-west-2.es.amazonaws.com/cds-search/_doc/1' -d '{"director": "Burton, Tim", "genre": ["Comedy","Sci-Fi"], "year": 1996, "actor": ["Jack Nicholson","Pierce Brosnan","Sarah Jessica Parker"], "title": "Mars Attacks!"}' -H 'Content-Type: application/json'