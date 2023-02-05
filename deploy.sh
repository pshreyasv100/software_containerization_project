
sudo docker rmi localhost:32000/inventory-api:v1 || true
sudo docker rmi localhost:32000/inventory-ui:v1 || true

microk8s ctr images rm localhost:32000/inventory-api:v1 || true
microk8s ctr images rm localhost:32000/inventory-ui:v1 || true



# microk8s kubectl delete -f ./deployment/db/postgres-service.yaml || true
# microk8s kubectl delete -f ./deployment/db/postgres-deployment.yaml || true
# microk8s kubectl delete -f ./deployment/db/postgres-storage.yaml || true



microk8s kubectl delete -f ./deployment/backend/inventory-api-deployment.yaml || true
microk8s kubectl delete -f ./deployment/backend/inventory-api-service.yaml || true

microk8s kubectl delete -f ./deployment/frontend/ui-deployment.yaml || true
microk8s kubectl delete -f ./deployment/frontend/ui-service.yaml || true


echo 'Building docker images ... '

sudo docker build -t localhost:32000/inventory-api:v1 ./inventory-backend/  &
pid1 = $!
wait $pid1

sudo docker build -t localhost:32000/inventory-ui:v1 ./inventory-ui/  &
pid1 = $!
wait $pid1

echo 'Pushing  docker images to registry ... '

sudo docker push localhost:32000/inventory-api:v1 
sudo docker push localhost:32000/inventory-ui:v1 

sleep 10



## DB
# echo 'Deploying db ... '
# microk8s kubectl apply -f ./deployment/db/postgres-config.yaml 
# microk8s kubectl apply -f ./deployment/db/postgres-secret.yaml 
# microk8s kubectl apply -f ./deployment/db/postgres-storage.yaml 
# microk8s kubectl apply -f ./deployment/db/postgres-deployment.yaml 
# microk8s kubectl apply -f ./deployment/db/postgres-service.yaml 
# sleep 15



## API
echo 'Deploying api ... '

microk8s kubectl apply -f ./deployment/backend/inventory-api-deployment.yaml 
microk8s kubectl apply -f ./deployment/backend/inventory-api-service.yaml 


## UI
echo 'Deploying ui ... '

microk8s kubectl apply -f ./deployment/frontend/ui-deployment.yaml 
microk8s kubectl apply -f ./deployment/frontend/ui-service.yaml 

microk8s kubectl apply -f ./deployment/inventory-ingress.yaml 

