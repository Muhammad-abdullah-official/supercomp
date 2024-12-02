import express from "express";
import reqProject from "../models/reqProject.js";
import requser from "../models/User.js";
const router = express.Router();

router.post("/reqProject", async (req, res) => {
  const { name, githubId, userName, reqGithubId } = req.body; // Assume githubId is passed in the request body

  try {
    // Create a new project
    const newProject = new reqProject({
      name,
      githubId,
      userName,
      reqGithubId,
    });

    console.log(newProject);

    await newProject.save();

    return res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/reqProject/:githubId", async (req, res) => {
  try {
    const { githubId } = req.params; // Extract the githubid from the URL parameters

    // Fetch projects that match the provided githubid
    const projects = await reqProject.find({ githubId });

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this GitHub ID" });
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;