# Docs https://hub.docker.com/r/gvenzl/oracle-xe

docker run -p 1521:1521 -d `
-e ORACLE_PASSWORD=mipassword `
-e APP_USER=appuser `
-e APP_USER_PASSWORD=budgetoliverosapp `
-v oracle-volume:/opt/oracle/oradata `
-v "C:\Users\d\Documents\React Project\budget-backend\db:/container-entrypoint-initdb.d" `
gvenzl/oracle-xe


# Backend Container
docker run -p 8500:8500 -d `
-e SERVER_PORT=8500 `
-e ORACLE_USER=appuser `
-e ORACLE_PASSWORD=budgetoliverosapp `
-e ORACLE_CONNSTR=172.17.0.2:1521/xepdb1 `
full-back:0.1.0
