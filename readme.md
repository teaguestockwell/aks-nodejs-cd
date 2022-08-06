# setup env for CD
1. create a container registry in azure
1. create an aks cluster with this config ![config](./public/aks.png)
1. create a github action secret named `REGISTRY_LOGIN_SERVER` with the value of the registry login server
1. create a github action secret named `REGISTRY_USERNAME` with the value of the registry username
1. create a github action secret named `REGISTRY_PASSWORD` with the value of the registry password
1. create github action secret named `KUBE_CONFIG` with the yml from `az aks get-credentials --resource-group k8s-demo-ss --name k8s-demo-cluster-ss --file kubeconfig-ss`

# create cluster secret that is used to verify req.headers.authorization
1. install az cli
1. az login
1. open azure portal, select aks cluster, click connect and run commands
1. echo -n some-secret > secret.txt
1. kubectl create secret generic mysecret --from-file=secret.txt
1. kubectl get secret mysecret  -o jsonpath='{.data}'

# Get https cert status
- kubectl describe certificate node-boilderplate

# HTTPS Ingress (wip)
- apply cert-manager to the cluster `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.crds.yaml`
- apply nginx-ingress chart to k8s cluster `helm install ingress-nginx ingress-nginx/ingress-nginx` 
- create a new a record in the dns for the public ip of the nginx ingress
- add the host name of that record to `k8/ingress.yml` and `k8/certificate.yml`
- bump the pipeline / manually redeploy as needed
