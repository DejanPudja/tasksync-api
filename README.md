## API Reference

#### Get all users

```
  GET /api/users/
```

| Parameter | Type   | Description     |
| :-------- | :----- | :-------------- |
| `none`    | `none` | Fetch all users |

#### Get user by ID

```
  GET /api/users/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the user |

#### Register user

```
  POST /api/users/register
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `name`     | `string` | **Required**. User's name     |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### Login user

```
  POST /api/users/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

#### Delete user

```
  DELETE /api/users/delete/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the user |

---

### Projects

#### Get all projects

```
  GET /api/projects/
```

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| `none`    | `none` | Fetch all projects |

#### Get project by ID

```
  GET /api/projects/${id}
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. ID of the project |

#### Get projects by user ID

```
  GET /api/projects/user/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the user |

#### Create project

```
  POST /api/projects/create
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `name`    | `string` | **Required**. Name of the project     |
| `user_id` | `string` | **Required**. ID of the project owner |
| `status`  | `enum`   | **Required**. ["active", "complete"]  |

#### Update project

```
  PUT /api/projects/update/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. ID of the project       |
| `name`    | `string` | **Optional**. New name of the project |
| `status`  | `enum`   | **Required**. ["active", "complete"]  |

---

### Tasks

#### Get task by ID

```
  GET /api/tasks/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the task |

#### Get tasks by project ID

```
  GET /api/tasks/project/${id}
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `project_id` | `string` | **Required**. ID of the project |

#### Create Task

```
  POST /api/tasks/create
```

| Parameter        | Type     | Description                                                                             |
| :--------------- | :------- | :-------------------------------------------------------------------------------------- |
| `name`           | `string` | **Required**. Name of the task                                                          |
| `description`    | `string` | **Optional**. Task description                                                          |
| `project_id`     | `number` | **Required**. ID of the project                                                         |
| `user_id`        | `number` | **Optional**. ID of the user to whom the task is assigned                               |
| `parent_id`      | `number` | **Optional**. ID of the parent task (for subtasks)                                      |
| `task_id`        | `number` | **Optional**. ID of the task                                                            |
| `assigned_to`    | `number` | **Optional**. ID of the user                                                            |
| `status`         | `string` | **Optional**. Current status of the task ("backlog", "estimate", "ready to proceed"...) |
| `tags`           | `array`  | **Optional**. Tags for categorizing the task                                            |
| `estimated_time` | `number` | **Optional**. Estimated time to complete the task (in seconds)                          |
| `tracked_time`   | `number` | **Optional**. Time tracked for the task (in seconds)                                    |
| `due_date`       | `string` | **Optional**. Due date for the task in ISO format (e.g., YYYY-MM-DD)                    |
| `type`           | `string` | **Optional**. Type of the task ("epic", "story", "task", "bug", "milestone")            |
| `priority`       | `string` | **Optional**. Priority of the task ("low", "normal", "high", "urgent")                  |
| `release`        | `string` | **Optional**. ("local", "develop", "staging", "live", "non-release", "beta env.")       |

#### Delete task

```
  DELETE /api/tasks/delete/${id}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the task |
