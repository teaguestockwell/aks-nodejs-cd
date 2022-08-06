# setup env for CD

1. create a container registry in azure
1. create an aks cluster with this config ![config](./public/aks.png)
1. create a github action secret named `REGISTRY_LOGIN_SERVER` with the value of the registry login server
1. create a github action secret named `REGISTRY_USERNAME` with the value of the registry username
1. create a github action secret named `REGISTRY_PASSWORD` with the value of the registry password
1. create github action secret named `KUBE_CONFIG` with the yml from `az aks get-credentials --resource-group k8s-demo-ss --name k8s-demo-cluster-ss --file kubeconfig-ss`

# create cluster secret that is used to verify req.headers.authorization - todo add this to action

1. install az cli
1. az login
1. open azure portal, select aks cluster, click connect and run commands
1. echo -n some-secret > secret.txt
1. kubectl create secret generic mysecret --from-file=secret.txt
1. kubectl get secret mysecret -o jsonpath='{.data}'

# get https cert status

- kubectl describe certificate node-boilerplate

# https Ingress (wip)

- apply cert-manager to the cluster `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.crds.yaml`
- apply nginx-ingress chart to k8s cluster `helm install ingress-nginx ingress-nginx/ingress-nginx`
- apply cert manger deps to the cluster `kubectl apply -f k8/issuer.yml && kubectl apply -f k8/certificate.yml && kubectl apply -f k8/ingress.yml`
- create an a record for the ip address of the ingress controller ![dns](./public/dns.png)
- grep `node-boiler.teaguestockwell.com` and replace it with the the host you assigned to the a record
- bump the pipeline / manually redeploy as needed
