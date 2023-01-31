

## Intial setup

```
CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    genre VARCHAR NOT NULL
);

Volumes
Create storage on hard disk before creating the volume and claim:
sudo mkdir -p /opt/postgre/data


sudo apt install postgresql-client

psql -h localhost -U postgresadmin --password -p 30001 postgresdb 
(enter password ) : admin123


-----------------------------
echo "Removing the backend image from local"
sudo docker rmi localhost:32000/inventory-api:v1 


echo "-----------------------"
echo "Removing the backend image from microk8s registry on localhost"
microk8s ctr images rm localhost:32000/inventory-api:v1

echo "-----------------------"
echo "Building backend docker image"
sudo docker build -t localhost:32000/inventory-api:v1 ./inventory-backend/

echo "-----------------------"
echo "Pushing the image to microk8s registry on localhost"
sudo docker push localhost:32000/inventory-api:v1


echo "Deleting existing backend deployment and service"
kubectl delete -f ./deployment/backend/inventory-api-deployment.yaml
kubectl delete -f ./deployment/backend/inventory-api-service.yaml

echo "-----------------------"
echo "Deploying the backend deployment and service"
kubectl apply -f ./deployment/backend/inventory-api-deployment.yaml
kubectl apply -f ./deployment/backend/inventory-api-service.yaml


```