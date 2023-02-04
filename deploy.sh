
sudo docker rmi localhost:32000/inventory-api:v1 || true
sudo docker rmi localhost:32000/inventory-ui:v1 || true

microk8s ctr images rm localhost:32000/inventory-api:v1 || true
microk8s ctr images rm localhost:32000/inventory-ui:v1 || true



microk8s kubectl delete -f ./deployment/db/postgres-service.yaml || true
microk8s kubectl delete -f ./deployment/db/postgres-deployment.yaml || true
microk8s kubectl delete -f ./deployment/db/postgres-storage.yaml || true



microk8s kubectl delete -f ./deployment/backend/inventory-api-deployment.yaml || true
microk8s kubectl delete -f ./deployment/backend/inventory-api-service.yaml || true

microk8s kubectl delete -f ./deployment/backend/inventory-ui-deployment.yaml || true
microk8s kubectl delete -f ./deployment/frontend/inventory-ui-service.yaml || true


echo 'Building docker images ... '

sudo docker build -t localhost:32000/inventory-api:v1 ./inventory-backend/ 
sudo docker build -t localhost:32000/inventory-ui:v1 ./inventory-ui/ 


echo 'Pushing  docker images to registry ... '

sudo docker push localhost:32000/inventory-api:v1 
sudo docker push localhost:32000/inventory-ui:v1 

echo 'Deploying db ... '


microk8s kubectl apply -f ./deployment/db/postgres-config.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-secret.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-storage.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-deployment.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-service.yaml 



echo 'Deploying api ... '

microk8s kubectl apply -f ./deployment/backend/inventory-api-deployment.yaml 
microk8s kubectl apply -f ./deployment/backend/inventory-api-service.yaml 
microk8s kubectl apply -f ./deployment/backend/inventory-api-ingress.yaml 



echo 'Deploying ui ... '

microk8s kubectl apply -f ./deployment/frontend/ui-deployment.yaml 
microk8s kubectl apply -f ./deployment/frontend/ui-service.yaml 
microk8s kubectl apply -f ./deployment/frontend/ui-ingress.yaml 


