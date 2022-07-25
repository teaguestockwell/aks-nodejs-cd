1. create a new container registry in azure
1. create aks cluster https://docs.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
1. configure actions to deploy to the cluster https://azure.github.io/kube-labs/1-github-actions.html#objective-of-the-lab

# creating a secret
1. az login
1. open azure portal, select aks cluster, click connect and run commands
1. echo -n '[secretValueHere]' > [secretKey].txt
1. kubectl create secret generic [secretName] --from-file=[secretKey].txt --namespace=buildablekc0b119
1. kubectl get secret mysecrets --namespace=buildablekc0b119 -o jsonpath='{.data}'
