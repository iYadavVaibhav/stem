# Tools and Frameworks

_tools, frameworks, libraries, systems, projects that help do IT Engineering work. Landing zone for new topics you learn that have no dedicated file_

- **Kubernetes** - is an open-source container orchestration system for automating software deployment, scaling, and management.


- IAC - **Infrastructure as a Code**
  - **Ansible** - It can provision the underlying infrastructure of your environment, virtualized hosts and hypervisors, network devices, and bare metal servers.
  - **Terraform** - It is used to automate various infrastructure tasks.
  - **AWS CloudFormation** - lets you create and manage a collection of Amazon Web Services (AWS) resources by provisioning and updating them in a predictable way. [more iyv](./aws-amazon-web-services.md#aws-cloudformation)


## Gmail Tricks

- `is:unread category:primary` shows important unread emails
- `is:unread -category:updates` shows unread but not updates
- Updates category is not clear, it has updates and primary both

## Chat GPT Tricks

**Prompt Formula**

- The better the prompt the better is response and so on.
- Include following in your prompt
  - **Task** `mandatory` - Write...
  - **Context** `important` - the reader is non-technical...
  - **Exemplar** `important` - It should include my last...
  - **Persona** `nice to have` - you are a male data engineer
  - **Format** `nice to have` - an email
  - **Tone** `nice to have` - professional

- Eg:
  
  ```py
  You are a senior product marketing manager at Apple   # persona
  and you have

  # context
  just unveiled the latest Apple product in collaboration with Tesla, the
  Apple Car, and received 12,000 pre-orders, which is 200% higher than target.
  # context
  
  Write               # task
  an email            # format
  
  to your boss, Tim Cookie, sharing this positive news.
  
  # exemplar
  The email should include a read section, project background, why this product came into existence, business results section, quantifiable business metrics, and end with a section thanking the product and engineering teams.
  # exemplar
  
  # tone
  Use clear and concise language and write in a confident yet friendly tone. # tone
  ```




