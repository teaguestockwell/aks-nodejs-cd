[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[license-shield]: https://img.shields.io/github/license/teaguestockwell/aks-nodejs-cd.svg
[license-url]: https://github.com/teaguestockwell/aks-nodejs-cd/blob/master/licence.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/teague-stockwell/

<br />
<p align="center">
  <img src="./public/ship.png" alt="Logo" width="450">

  <h3 align="center">AKS Node CD</h3>

  <p align="center">
    <a href="https://github.com/teaguestockwell/aks-nodejs-cd/issues">Report Bug</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#pre-requisites">Pre Requisites</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#helpful-links">Helpful Links</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</details>

# About The Project
A template for continuous delivery of a nodejs service to Azure Kubernetes Service

### Node Service
- jest
- supertest
- prettier
- eslint
- typescript
- webpack
- local docker builds
- babel 
- rest client
- autocannon

### Pipeline
1. lints
1. unit / integration tests
1. compiles
1. webpack bundles
1. builds docker image
1. publishes the image to an azure container registry
1. syncs github action secrets to the aks cluster
1. triggers a rolling deployment of the image to the cluster

### Deployment
- cert manager
- nginx https ingress

# Pre Requisites
- docker
- git
- node

# Getting Started
To get a local copy up and running follow these simple steps.

1. use this template to create a new repo
1. clone your new repo
1. install dependencies
```sh
yarn
```
4. run the server
```sh
yarn docker:start
```
5. navigate to http://localhost:3000

# Deployment
### Secrets and Components
- create a container registry in azure
- grep `buildablecr0.azurecr.io` and replace it with your login container registry login
- grep `node-boilerplate` and replace it with a name for your project
- create an aks cluster with this config ![config](./public/aks.png)
- create a github action secret named `REGISTRY_USERNAME` with the value of the registry username
- create a github action secret named `REGISTRY_PASSWORD` with the value of the registry password
- create a github action secret named `SECRETS` with the value of `{"jwt": "abc123"}` secret used to verify req.headers.authorization
- create github action secret named `KUBE_CONFIG` with the yml from `az aks get-credentials --resource-group k8s-demo-ss --name k8s-demo-cluster-ss --file secret.kubeconfig`

### HTTPS Ingress
1. grep `node-boiler.teaguestockwell.com` and replace it with the the host you assigned to the a record
1. grep `tsappdevelopment@gmail.com` and replace it with your email
1. `helm repo add cert-manager https://charts.jetstack.io`
1. `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
1. `helm install cert-manager cert-manager/cert-manager --set installCRDs=true`
1. `helm install nginx-ingress ingress-nginx/ingress-nginx`
1. create an a record for the ip address of the ingress controller. This can be found using the external ip listed when running `kubectl get svc` ![dns](./public/dns.png)
1. wait for the dns to propagate, you can verify this when `ping $host` matches the ip address you set in the a record
1. apply the ingress controller to the cluster `kubectl apply -f k8/ingress.yml`
1. apply the cert issuer to the cluster `kubectl apply -f k8/issuer.yml`
1. bump the pipeline / manually redeploy as needed

## Helpful Links
- https://cert-manager.io/docs/tutorials/acme/nginx-ingress

## Roadmap
See the [open issues](https://github.com/teaguestockwell/aks-nodejs-cd/issues) for a list of proposed features (and known issues).

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Teague Stockwell - [LinkedIn](https://www.linkedin.com/in/teague-stockwell)