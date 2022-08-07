# setup env for CD
1. create a container registry in azure
1. create an aks cluster with this config ![config](./public/aks.png)
1. create a github action secret named `REGISTRY_LOGIN_SERVER` with the value of the registry login server
1. create a github action secret named `REGISTRY_USERNAME` with the value of the registry username
1. create a github action secret named `REGISTRY_PASSWORD` with the value of the registry password
1. create a github action secret named `SECRETS` with the value of `{"jwt": "abc123"}` secret used to verify req.headers.authorization
1. create github action secret named `KUBE_CONFIG` with the yml from `az aks get-credentials --resource-group k8s-demo-ss --name k8s-demo-cluster-ss --file secret.kubeconfig`

# setup https ingress
- grep `node-boiler.teaguestockwell.com` and replace it with the the host you assigned to the a record
- grep `tsappdevelopment@gmail.com` and replace it with your email
- `helm repo add cert-manager https://charts.jetstack.io`
- `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
- `helm install cert-manager cert-manager/cert-manager --set installCRDs=true`
- `helm install nginx-ingress ingress-nginx/ingress-nginx`
- create an a record for the ip address of the ingress controller. This can be found using the external ip listed when running `kubectl get svc` ![dns](./public/dns.png)
- wait for the dns to propagate, you can verify this when `ping $host` matches the ip address you set in the a record
- apply the ingress controller to the cluster `kubectl apply -f k8/ingress.yml`
- apply the cert issuer to the cluster `kubectl apply -f k8/issuer.yml`
- bump the pipeline / manually redeploy as needed

# helpful links
- https://cert-manager.io/docs/tutorials/acme/nginx-ingress
- 