---
description: Vagrant and Virtual Box Notes
date: 2020-07-15
---

# Virtual Box

Vagrant is a CLI to create virtual box with all configurations in a file. 

- Install vagrant by downloading from site. It installs package with CLI.
- Create following file in any folder, say `~/vagrant/vagrantfile`:

```py
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
end
```

- Then run `vagrant up`. On first run it will download and install ubuntu 16.04, 1GB, at 192.168.33.10. In subsequent run it will just start the VM.
- do, `vagrant ssh` to ssh to new vm.
- `vagrant halt` to stop a VM
- DANGER ZONE: `vagrant destroy` to delete a VM