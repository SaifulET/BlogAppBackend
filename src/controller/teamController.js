import axios from 'axios';
import FormData from 'form-data';
import teamModel from '../model/teamModel.js';

const IMGBB_API_KEY = '995de580d72236ef4962c4f1435077f1'; // replace with your key

// Upload function for imgbb using buffer 
const uploadToImgbb = async (buffer) => {
  const form = new FormData();
  form.append('key', IMGBB_API_KEY);
  form.append('image', buffer.toString('base64'));

  const res = await axios.post('https://api.imgbb.com/1/upload', form, {
    headers: form.getHeaders(),
  });

  return res.data.data.url;
};

export const CreateTeam = async (req, res) => {
  try {
    const { name, des, role } = req.body;

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToImgbb(req.file.buffer);
    }

    const teamCreate = new teamModel({
      name,
      des,
      role,
      image: imageUrl,
    });

    await teamCreate.save();
    res.status(201).json({ message: 'Member created successfully', data: teamCreate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const UpdateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const user = await teamModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Member not found.' });
    }

    const { name, des, role } = req.body;

    if (name) user.name = name;
    if (des) user.des = des;
    if (role) user.role = role;
    if (req.file) {
      const imageUrl = await uploadToImgbb(req.file.buffer);
      user.image = imageUrl;
    }


    await user.save();
    res.json({ message: 'Member info updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetTeam = async (req, res) => {
  try {
    const members = await teamModel.find();
    if (members.length === 0) {
      return res.status(404).json({ message: 'No members found' });
    }

    res.json({ data: members });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const user = await teamModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await teamModel.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully', user: deletedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
