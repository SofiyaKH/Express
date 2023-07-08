const express = require("express");
const { init, User, Note } = require("./models/init");

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      include: Note,
    });
    return res.json({
      data: users,
    });
  } catch (e) {
    res.json(e);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: Note,
    });
    return res.json(user);
  } catch (e) {
    res.json(e);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.reload();
    return res.status(201).json(user);
  } catch (e) {
    res.json(e);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.name = req.body.name;
    }

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    res.json(e);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    return res.status(204).json();
  } catch (e) {
    res.json(e);
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: User,
    });
    return res.json({
      data: notes,
    });
  } catch (e) {
    res.json(e);
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
      },
      include: User,
    });
    return res.json(note);
  } catch (e) {
    res.json(e);
  }
});

app.post("/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    await note.reload();
    return res.status(201).json(note);
  } catch (e) {
    res.json(e);
  }
});

app.patch("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (note) {
      note.text = req.body.text;
      note.UserId = req.body.UserId;
    }

    await note.save();
    return res.status(200).json(note);
  } catch (e) {
    res.json(e);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    await note.destroy();
    return res.status(204).json();
  } catch (e) {
    res.json(e);
  }
});

app.listen(3000, async () => {
  await init();
});
