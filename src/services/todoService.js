const API_URL = 'http://localhost:3001/todos'

export async function getTodos() {
  const response = await fetch(API_URL)
  return response.json()
}

export async function addTodo(title) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })

  return response.json()
}

export async function updateTodo(todo) {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })

  return response.json()
}

export async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}