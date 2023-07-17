# Rail Ticketing Application
http://metro-mysql-dev.ap-south-1.elasticbeanstalk.com/
# Version History
| Date | Summary | Improvement | Link
| ---- | ------- | ----- | ------|
| Apr 2021 | Original app |  | [Old Repo](https://github.com/mr-loop-1/ViceCity-MetroProject)
| Mar 2022 | Minor changes | minor (sql2 etc) | [Old Repo](https://github.com/mr-loop-1/RailTicketSQL-Legacy)
| Oct 2022 | Major refactors and updated code | Major (ES6, refactoring) | [This Repo #4d8ff23](https://github.com/mr-loop-1/Metro-Ticket-App-sql/tree/4d8ff2343721db9d51cb35dd404931ceafad4226)
| Dec 2022 | Current Version | Major (knex, migrations/seeds, data-driven DVC, etc]  | [This Repo](#repository-container-header)

# Important
Database schema and path algorithm are inside the **'algorithm' folder** (and at https://github.com/mr-loop-1/SQLpath-Algo). Creating the database and running migrations and seeders locally is **must** for functioning of the app.

## Instructions
1. Clone the repo
2. Do `npm i`
3. Update your env based on `.env.example`
4. Make migrations using `npx knex migrate:latest`
5. Seed tables using `npx knex seed:run`
7. Open terminal and do `npm start`


## Screenshots


![Screenshot 2022-03-30 195322](https://user-images.githubusercontent.com/62374784/160860682-e14bab9e-439e-4685-920d-f88bbd4876c3.png)


![Screenshot 2022-03-30 195356](https://user-images.githubusercontent.com/62374784/160860699-e099380e-29c8-4c8d-b3d1-31b84636bf44.png)


![Screenshot 2022-03-30 195520](https://user-images.githubusercontent.com/62374784/160860714-19776f2e-9a12-4fde-81ef-c18861b9a94c.png)


![Screenshot 2022-03-30 195529](https://user-images.githubusercontent.com/62374784/160860759-11215901-dfb3-434a-8f7b-fafff8c8f3b7.png)


![Screenshot 2022-03-30 195525](https://user-images.githubusercontent.com/62374784/160860776-142cb52e-8252-4fd8-b44d-58d9539955ea.png)


![Screenshot 2022-03-30 195517](https://user-images.githubusercontent.com/62374784/160860790-7c68b5be-a973-47cc-9f05-d2bdf9145ba8.png)
