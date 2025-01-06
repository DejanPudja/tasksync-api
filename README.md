## API Reference

#### Get all users

```http
  GET /users/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none`    | `none`   | Fetch all users           |

#### Get user by ID

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user      |


#### Register user

```http
  POST /users/register
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `name`      | `string` | **Required**. User's name    |
| `email`     | `string` | **Required**. User's email   |
| `password`  | `string` | **Required**. User's password |

#### Login user

```http
  POST /users/login
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `email`     | `string` | **Required**. User's email   |
| `password`  | `string` | **Required**. User's password |

#### Delete user

```http
  DELETE /users/delete/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required**. ID of the user |

---

### Projects

#### Get all projects

```http
  GET /projects/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none`    | `none`   | Fetch all projects         |

#### Get project by ID

```http
  GET /projects/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the project   |

#### Get projects by user ID

```http
  GET /projects/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the user      |

#### Create project

```http
  POST /projects/create
```

| Parameter   | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `name`      | `string` | **Required**. Name of the project |
| `user_id`   | `string` | **Required**. ID of the project owner |
| `status`    | `enum`   | **Required**. ["active", "complete"] |

#### Update project

```http
  PUT /projects/update/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the project   |
| `name`    | `string` | **Optional**. New name of the project |
| `status`    | `enum`   | **Required**. ["active", "complete"] |

---

### Tasks

#### Get task by ID

```http
  GET /tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the task      |

#### Get tasks by project ID

```http
  GET /tasks/project/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `project_id`      | `string` | **Required**. ID of the project   |

#### Create Task

```http
  POST /tasks/create
```

| Parameter         | Type     | Description                                                        |
| :---------------- | :------- | :----------------------------------------------------------------- |
| `name`            | `string` | **Required**. Name of the task                                     |
| `description`     | `string` | **Optional**. Task description                                     |
| `project_id`      | `number` | **Required**. ID of the project                                    |
| `user_id`         | `number` | **Optional**. ID of the user to whom the task is assigned          |
| `parent_id`       | `number` | **Optional**. ID of the parent task (for subtasks)                 |
| `task_id`       | `number` | **Optional**. ID of the task |
| `assigned_to`       | `number` | **Optional**. ID of the user |
| `status`          | `string` | **Optional**. Current status of the task ("backlog", "estimate", "ready to proceed"...)                      |
| `tags`            | `array`  | **Optional**. Tags for categorizing the task                      |
| `estimated_time`  | `number` | **Optional**. Estimated time to complete the task (in seconds)      |
| `tracked_time`    | `number` | **Optional**. Time tracked for the task (in seconds)                |
| `due_date`        | `string` | **Optional**. Due date for the task in ISO format (e.g., YYYY-MM-DD) |
| `type`            | `string` | **Optional**. Type of the task ("epic", "story", "task", "bug", "milestone")  |
| `priority`        | `string` | **Optional**. Priority of the task ("low", "normal", "high", "urgent")       |
| `release`         | `string` | **Optional**. ("local", "develop", "staging", "live", "non-release", "beta env.")                     |

#### Delete task

```http
  DELETE /tasks/delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the task      |