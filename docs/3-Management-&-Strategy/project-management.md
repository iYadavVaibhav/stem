---
description: Project Management Notes
date: 2022-06-08
---

# Project Management

Project Management is balancing between **"the project scope"** and **"the time, resources and budget"** you have. Manage "the time, resource and budget" to cover "the project scope". It includes **planning process** like requirement gathering, planning, solution design, code, test, deploy. We need to break down the project into **doable work tasks**. Once broken, **estimate** them. Finally **assign** them to get started. It can include the steps below

## Steps for End to End Project Management

### 1 Initiation and Ideation

- Business **Requirement Gathering**
- What are you solving and how will you solve it? The business **use case**.
- Define use case, scope and expectations. This is very high level and covers the **business problem**.
- Project **should have a definite end** - a product or a service. It should have **definition of done**.
- Above can result in `Business Requirements Document`

### 2 Defining - Goals and Objectives

- What needs to be done? How it can be done? Define the goal and objectives.
- Goal - should clearly and **simply define** a state considering most important factors.
- Objectives - they sould be specific, **measurable**, achievable, realistic and time-related. Documented. Also specify the category of aobjective:
  - qualitative - improve experience. measure by survey rating
  - financial - inc revenue by 15%
  - operational - reduce number of notifications
- Definition of Done. This will help breaks down the problem into sub-tasks and defines what is expected.
- Above can shape the `High Level Document`
- Identify the Stakeholders and in the document add their:
  - objectives requirements and interests
  - contribution
  - what are they concerned about
  - their line mangers, eg, if you need somoeone from finance team then take approval from their line managers.
- Be precise, take what matters and drop what doesn't. Clearly define what is in and out of scope, write it down.
- It can take several rounds with stakeholders to get correct objectives and scope.

### 3 Planning - Choose a Strategy

- Brainstorm with group and let ideas flow in.
- Write possible options to achieve an objectives. Then pick one of the option that covers all scenarios and meets all objectives and goals.
- Considerations to be made
  - is the **strategy feasible**, achievable?
  - are the risks acceptable: security, load balancing, **new technologis challenges** etc?
  - culture - does it fit the org pattern?
- above can shape `Low Level Document`
- Get a F2F **sign-off** here, over email and treat it as approved.

### 4 Solution Design - Modules, Tasks, Sub-Tasks, Deliverables

- Break the objectives/goals in to `modules`,  `technical work tasks` and `sub-tasks` using the strategy and define `deliverables`.
- Tasks - Add business understandings, definitions and calculations.
  - Sub-task - Add **definition of done**. Managable and doable tasks.
  - Deliverables - Identify them, clearly and quantifiably measure them
- Define Scenarios and map expectations - the above tasks should cover all scenarios and expectations.
- This sould define the `Software Design Document` can be planned on Jira and documented on Confluence.
- Take a **technical sign-off and approval** if required.

### 5 Delivery Plan - Estimate Assign

- Arrange work tasks in **sequence**, link them with **dependencies**, add **duration**.
- Resource Allocation - assign the tasks to resources. These can be done in Jira. Look out for blockers and unavailability.
- Make a realistic schedule - include holidays, dependencies.
- **Deadlines** - Management can set a deadline, you need to adjust schedule to meet it. Add resource, or break into phase. Do phase analysis - define the **MVP** to deliver early. Do Phase II enhancements etc.
- `Gantt Chart` - optional reporting.

### 6 Risk Assessment - Clarify Assumptions

- Avoid risks that are based on assumptions, like someone will do the deployment, access would work.
- Will the business stop if solution is down? What if resource not available?
- What if data gets corrupt?

### 7 Other optional documents/plans

- Budget - Add costs, include resources, softwares.
- Communication plan - scrums, weekly, daily
- Change Management Plan - approvals, what changes when, impact
- Procurement plan - to buy software, resources, contracting

### 8 Execution - Development

- Write code and document it.
- Do **pilot delivery** - a quick delivery and test. If works, keep expanding by adding features.
- **Monitoring and Controlling** - evaluate and get it back on track if lagging or deviated.
- Keep **unit testing** the code.
- `Deliverables` - code files, reports, documents. All should be in one place and version controlled.

### 9 QA Prepration - Testing

- Make **test cases** and test scenarios as you go.
- Identify Testers from Stake Holders.
- Make a `bug tracker` where any one can **report bugs** and it can be tracked.
- `QA Document` - add test cases and their results.
- Get a **UAT Sign Off** of the deliverables.

### 10 Deployment

- Deploy in prod. Test it.
- Prod Env is secured and hence may require many **access permissions**. Please see this in advance.
- **Change Management** may be required here.
- Once deployed, do a **Prod Testing**.
- Finally **release** the product

### 11 Handover - User Training Socialisation

- Prepare a `Training Guide` - for end users. This can be video as well.
- Make a `Handover Document` - if this need to be handed over to maintenance team to work on manual tasks.
- Manual tasks - include scope, work required, frequency, risks etc.
- Contracts - get signed-off if required.

## Best Practices

- Deliverables and Documentation - All files and documentation at **one place** and all have **access**. Confluencem, Jira Boards and Shared Drives.
- Estimation - Set clear goals. Manage Workload.
- Communication - 1-1 meetings weekly. **Daily Updates**.
- **Change Management** - if change is required in between, follow a change management procedure and redo all steps and sign offs.
- Reviews - Doc, deliverable. Continuous review helps.
- Opennes - Be open, let them choose tool, let them choose way, keep them foucsed. Trust them.
- Risk Management - each team member is accountable to explain risk in their task to entire team. Don't let people assume the work, ask them and clarify it.

## Documentation

Step 1: Plan the documentation

Step 2: Prepare the document

Great user documentation should include:

- Plain language
- Simplicity
- Visuals
- A focus on the problem
- A logical hierarchy and flow
- A table of contents
- Searchable content
- Accessible content
- Good design
- Feedback from real users
- Links to further resources

Step 3: Test the document

Step 4: Keep it upated.

### Spinx

- Sphinx is the de-facto documentation tool for Python.
- version controlled, sourced from repo
- read everywhere, confluence, wiki, PDF
- Also lets document functions and classes


## Talk - Product Strategy, Systems, and Frameworks with Sachin Rekhi

- Sachin built `LinkedIn Sales Navigator`, $200m in 1.5yr, 0-500 employee
- Learn to write and sell code.
- How to be in Product Management path?
  - **Adjacent role**, keep coding and start managing the product. Add values, show interest, then keep moving to product role.
  - Be a **domain expert**, like expert in sales tech, expert in education-tech, med-tech, sports-tech.
- Sales Navigator story
  - he built connected, personal CRM, it was acquired by linkedIn.
  - showed delivering product quickly, initial traction, showed internal credibility in linkedin, then got the bigger and riskier bet.
  - **Credibility** and **Social-Capital** is required to take new bigger opportunities.
  - Share your aspirations with manager, but show credibility too for that.
- **Strategy** to build a product - product should answer these quesitons, and in a compelling way
  - what is the problem you are solving? separate from solution? what is the pain? Exact knowledge helps
  - who is the audience, as psecific as possible. understand exactly who the are, mroe specific more success
  - value, benifit from solcution
  - competitive, better than competitors, why? who will compete in long term and short term.
  - growth strategy, how to get customers?
  - buiness model, profit?
- how to make it **compelling**?
  - does the problem `resonates with audience`?
  - business model has `growth strategy`?
  - have strong interplay in between these, specially when starting new product.
- **Growth Startegy**
  - paid ads, then is customer giving that value, think of LTV, `lifetime value` or `customer acquisition cost`, CAC. Have greater LTV to afford CAC.
  - product should be expensive enough to support sales team.
- Framework / process for **buy in** (convincing)
  - get team of 8-10 engg, work as a venture
  - do `prod research`, come with PPT, having screenshots and client feedback
  - have detailed `compelling customer feedback`, is it compelling?
  - have `convincing facts` for capitalists
  - 6 convincing style
    - framing - narrative in a way, set a context
    - goal seek - align to their goals
    - citation - ab tests, voice of customer
    - narration - compelling story
    - find which style will work
- **Entrepreneur** journey
  - idea of product came form office work
    - we dont have info we need, 90% info is not in wiki confluence, hence `notejoy`
  - `earned secrets`, give you start up ideas
- **Hurdles**
  - fewer resources, no research team, less marketing team
  - no client base, make your own customers, build growth strategy from day 1, share virally

## Links

- Steps <https://www.wrike.com/blog/foolproof-project-plan/>
- Detailed <https://www.smartsheet.com/content/software-project-management>
- LinkedIn Learning - <https://www.linkedin.com/learning/project-management-foundations-4>
- PMP Certification <https://www.pmi.org/certifications/project-management-pmp>
- [ ] SAFe POPM
- TOGAF <https://www.opengroup.org/togaf>
