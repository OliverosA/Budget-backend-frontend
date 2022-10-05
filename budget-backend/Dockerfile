## Build
# docker build -t full-back:0.1.0 .

# docker tag full-back:0.1.0 oliverosa/full-back:0.1.0

## Run
# docker run -p 8500:8500 full-back:0.1.0

FROM oraclelinux:8.6

# Oracle Cliente Install
# https://yum.oracle.com/oracle-instant-client.html
RUN dnf install -y oracle-instantclient-release-el8
RUN dnf install -y oracle-instantclient-basic

# Install Nodejs
RUN dnf install -y @nodejs:16

# Set Variables de entorno
ENV SERVER_PORT="8500" \
    ORACLE_USER="oracledb" \
    ORACLE_PASSWORD="mypass" \
    ORACLE_CONNSTR="localhost:1521/orclpdb" \
    API_URL="/api/v1" \
    AUTH_TOKEN="budgetappdiasbdjikasbjikfhgbasdihjkfvbdshujfbsdajkhfdcbvujazsdhjfes"

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]