

## Steps to deploy app


# Volumes

Create storage on hard disk before creating the volume and claim:
```
sudo mkdir -p /opt/postgre/data
```
The following commands can be executed directly via deploy.sh

# Database
```
microk8s kubectl apply -f ./deployment/db/postgres-config.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-secret.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-storage.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-deployment.yaml 
microk8s kubectl apply -f ./deployment/db/postgres-service.yaml 
```
# Backend 

Build docker image of backend
```
sudo docker build -t localhost:32000/inventory-api:v1 ./inventory-backend/ 
```

Push it microk8s local registry
```
sudo docker push localhost:32000/inventory-api:v1 
```

Deploy the backend
```
microk8s kubectl apply -f ./deployment/backend/inventory-api-deployment.yaml 
microk8s kubectl apply -f ./deployment/backend/inventory-api-service.yaml 
```

Build docker image of ui
```
sudo docker build -t localhost:32000/inventory-ui:v1 ./inventory-ui/  &
```

Push it microk8s local registry
```
sudo docker push localhost:32000/inventory-ui:v1 
```


# Frontend
```
microk8s kubectl apply -f ./deployment/frontend/ui-deployment.yaml 
microk8s kubectl apply -f ./deployment/frontend/ui-service.yaml 
```

# TLS

Tls has been configured using cert-manager
```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml

kubectl apply -f self-signed-issuer.yaml
kubectl apply -f self-signed-cluster-issuer.yaml
kubectl apply -f root-ca.yaml
kubectl apply -f ca-issuer.yaml
``` 

Ingress to allow access from outside the cluster
```
microk8s kubectl apply -f ./deployment/inventory-ingress.yaml 
```

# Helm

Helm charts have been implemented but due to some issues it still needs more work  so we are deploying the components manually on microk8s

```
helm install /helm/chart --generate-name
```


# RBAC

We have implemented 2 roles developer and admin under deployment/rbac 

which were tested on users created by adding entries to known_tokens.csv

# Network-policy

There are 2 network policies under deployment/network-policy 

