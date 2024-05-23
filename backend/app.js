const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log("MongoDB URI:", process.env.MONGO_URI);

const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB successfully connected");
  // Atualizar status de tarefas se necessário
  updateTaskStatuses(); // Chame esta função aqui se precisar executar no início.
})
.catch(err => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());


// Schema para Project
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creatorId: { type: String, required: true },
  members: [{ type: String, required: true }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

// Schema para Task
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'Pendente', enum: ['Pendente', 'Em Progresso', 'Concluído'] }
});

// Criando modelos
const Project = mongoose.model('Project', projectSchema);
const Task = mongoose.model('Task', taskSchema);

// Rotas
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('tasks');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('tasks');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, description, creatorId } = req.body;
  const project = new Project({ title, description, creatorId, members: [creatorId] });
  try {
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, projectId } = req.body;

  console.log('Creating task with data:', { title, description, projectId });

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Invalid projectId' });
  }

  const task = new Task({ title, description, projectId });
  try {
    await task.save();
    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (task.isCompleted) {
      return res.status(400).json({ message: 'Tarefas concluídas não podem ser editadas.' });
    }

    task.title = title;
    task.description = description;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    await task.remove();
    await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: taskId } });
    res.json({ message: 'Tarefa removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/projects/:id/add-member', async (req, res) => {
  const { userId } = req.body; // ID do usuário a ser adicionado
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    if (project.creatorId !== req.user.id) { // Supondo que `req.user.id` seja o ID do usuário logado
      return res.status(403).json({ message: 'Apenas o criador do projeto pode adicionar membros.' });
    }

    // Adiciona o usuário ao projeto se ele já estiver registrado na plataforma
    // Suponha que `User` é seu modelo de usuário e `userId` é válido e está registrado
    if (await User.exists({ _id: userId })) {
      project.members.push(userId);
      await project.save();
      res.json(project);
    } else {
      res.status(404).json({ message: 'Usuário não registrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/tasks/:id/status', async (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (task.isCompleted) {
      return res.status(400).json({ message: 'Tarefas concluídas não podem ser editadas.' });
    }
    if (['Pendente', 'Em Progresso', 'Concluído'].includes(status)) {
      task.status = status;
      await task.save();
      res.json(task);
    } else {
      res.status(400).json({ message: 'Status inválido.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Função para atualizar os status das tarefas
async function updateTaskStatuses() {
  const result = await Task.updateMany({ status: { $exists: false } }, { status: 'Pendente' });
  console.log(`Atualizado ${result.nModified} tarefas para o status padrão 'Pendente'.`);
}


// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
