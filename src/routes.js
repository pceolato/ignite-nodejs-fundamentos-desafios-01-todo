import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePatch } from "./utils/build-route.path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePatch('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                tile: search,
                description: search
            }: null)
        
            return res.end(JSON.stringify(tasks))
          }
    },
    {
        method: 'POST',
        path: buildRoutePatch('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
        
            const task = {
              id: randomUUID(),
              title,
              description,
              completed_at: null,
              created_at: new Date(),
              updated_at: new Date(),
            }
        
            database.insert('tasks', task)
        
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePatch('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            const task = database.selectById('tasks', id)

            if(!task) return res.writeHead(404).end()

            const newTask = {
                title,
                description,
                completed_at: task.completed_at,
                created_at: task.created_at,
                updated_at: new Date(),
            }

            database.update('tasks', id, newTask)

            return res.writeHead(204).end()
        },
    },
    {
        method: 'PATCH',
        path: buildRoutePatch('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.selectById('tasks', id)

            if(!task) return res.writeHead(404).end()

            const newTask = {
                title: task.title,
                description: task.description,
                completed_at: new Date(),
                created_at: task.created_at,
                updated_at: new Date(),
            }

            database.update('tasks', id, newTask)

            return res.writeHead(204).end()
        },
    },
    {
        method: 'DELETE',
        path: buildRoutePatch('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.selectById('tasks', id)

            if(!task) return res.writeHead(404).end()

            database.delete('tasks', id)

            return res.writeHead(204).end()
        },
    }
]