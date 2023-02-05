```
Steps to deploy app
-------------------

Volumes
Create storage on hard disk before creating the volume and claim:
sudo mkdir -p /opt/postgre/data


Backend 
microk8s kubectl apply -f ./deployment/backend/inventory-api-deployment.yaml 
microk8s kubectl apply -f ./deployment/backend/inventory-api-service.yaml 


Frontend
microk8s kubectl apply -f ./deployment/frontend/ui-deployment.yaml 
microk8s kubectl apply -f ./deployment/frontend/ui-service.yaml 

TLS
---
Tls has been configured using cert-manager

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml

kubectl apply -f self-signed-issuer.yaml
kubectl apply -f self-signed-cluster-issuer.yaml
kubectl apply -f root-ca.yaml
kubectl apply -f ca-issuer.yaml

Ingress to allow access from outside the cluster
microk8s kubectl apply -f ./deployment/inventory-ingress.yaml 

Helm
----
Helm charts have been implemented but due to some issues it still needs more work  so we are deploying the components manually on microk8s


RBAC
----
We have implemented 2 roles developer and admin under deployment/rbac 

which were tested on users created by adding entries to known_tokens.csv

Network-policy
--------------
There are 2 network policies under deployment/network-policy 


```