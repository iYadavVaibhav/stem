---
description: Vagrant and Virtual Box Notes
date: 2020-07-15
---

# Virtual Box

_virtual box, vagrant, setting and networking_

## ORBStack

_a tool to manage docker and virtual machine on Mac_

After installation, run local docker container with all documentation using below command

```sh
docker run -it -p 80:80 docker/getting-started
```

§

Links:

- [docs](https://docs.orbstack.dev/)
- [discussion](https://news.ycombinator.com/item?id=36668964)

## Enable SSH access to VM from remote

_guide to let you use vm via SSH_

**Install ssh server on virtual machine**

The machine you need to connect to should have ssh installed and enabled so that it can allow remotes to connect to it.

On ubuntu server or desktop

```sh
# install ssh
sudo apt install openssh-server

# view status
sudo systemctl status ssh

# Ubuntu ships with a firewall configuration tool called UFW
sudo ufw allow ssh

# get IP address, something like 10.0.2.15
ip a
```

Default SSH port is 22. So now your VM will listen too this port.

**Configure Virtual Box Network**

VirtualBox creates a Network Address Translation (NAT) adapter for VMs. This allows VM to access the internet but prevents other devices from accessing it via SSH. To configure the network, you need to use VirtualBox **port forwarding** on the default NAT adapter your VM is attached to.

Click on `Virtual Machine > Settings > Network > Adapter 1 > Advanced > Port Forwarding`. Next, Add a Port Forwarding Rule. Click on the Plus (+) icon under the Port Forwarding Rules page. Give your rule a meaningful name (for example "SSH port forwarding"). Use the default protocol i.e. TCP. The host IP will be 127.0.0.1 or simply localhost and use 2222 as the Host Port.

```yaml
Name: SSH port forwarding
Protocol: TCP
Host IP: 127.0.0.1
Host Port: 2222
Guest IP: 10.0.2.15
Guest Port: 22
```

Finally, press the Ok button. You can read more in detail on [enable network port forwarding on virtual box](https://www.makeuseof.com/how-to-ssh-into-virtualbox-ubuntu/#:~:text=Step%202%3A%20Configuring%20the%20VirtualBox%20Network) page.

Another option that work directly without port forwarding is by using "**Bridged Network**" as network on virtual machine. This gives VM an IP on same LAN network as your host is, so if your host is on `192.168.1.10` then VM may get `192.168.1.15`.

**Connecting from Remote**

On remote to connect via ssh

```sh
ssh -p 2222 gues_vm_username@127.0.0.1
```

**VM Web Server Access to Host**

Similarly you can add another port-forwarding for `80:8080` to let website hosted on VM be accessed from your host.

```yaml
Name: Web Server port forwarding
Protocol: TCP
Host IP: 127.0.0.1
Host Port: 8080
Guest IP: 10.0.2.15
Guest Port: 80
```

Access webhost using: `127.0.0.1:8080`

**How does port forwarding work?**

When you do ssh on `127.0.0.1:2222` it is forwarded to `10.0.2.15:22` which lets the connection happen. Both IP are on separate network hence you cannot directly do `user@10.0.2.15:22` directly from host.

**Links**

- <https://www.makeuseof.com/how-to-ssh-into-virtualbox-ubuntu/>
- <https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-20-04/?utm_content=cmp-true>
- [Nakivo - VM Network Settings](https://www.nakivo.com/blog/virtualbox-network-setting-guide/)


## Command Line Control of Virtual Box

**Ubuntu on Windows Virtual Box SSH**

```sh
# Start Ubuntu
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" startvm "ubuntu22" --type headless

# SSH from Host
ssh -p 2222 vaibhav@127.0.0.1

# Off Ubuntu
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "ubuntu22" poweroff
```

## VM Jupyter access on Host

_how to access jupyter on virtual box form your host_

You should be able to do SSH to VM from host. Once SSHed, do

```sh
# In ubuntu or its shell
jupyter notebook --no-browser --port=9299
```

this starts jupyter in VM on `localhost:9299`. Now to access this from host:

```sh
# SSH from host and link another port
ssh -p 2222 -L 9299:localhost:9299 vaibhav@127.0.0.1
```

Here, The -L option is used to **bind** a port on the local machine with a remote port at the remote destination IP address. Format is `ssh -L local_port:remote_destination:remote_port user@ssh_server`

You can read more on [SSH tunnels and access guide](https://www.techtarget.com/searchsecurity/tutorial/How-to-use-SSH-tunnels-to-cross-network-boundaries).

## Vagrant

Vagrant is a **CLI** to create virtual box with all configurations in a file. 

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
