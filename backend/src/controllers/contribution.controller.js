import Member from '../models/Member.model.js';
import Event from '../models/Event.model.js';

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate('contributions.event')
      .sort({ createdAt: -1 });
    res.status(200).json({ message: 'Members fetched successfully', members });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
};

export const getMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id).populate('contributions.event');
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json({ message: 'Member fetched successfully', member });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error });
  }
};

export const createMember = async (req, res) => {
  try {
    const { name, phone, role, position, group, married, spouse } = req.body;

    const minContribution = group <= 18 ? 200 : 500; // rule from your description

    const newMember = new Member({
      name,
      phone,
      role,
      position,
      group,
      married: married || false,
      contributions: [], // start empty
      spouse: married ? { ...spouse, contributions: [] } : undefined,
    });

    await newMember.save();
    res
      .status(201)
      .json({
        message: 'Member created successfully',
        member: newMember,
        minContribution,
      });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, role, position, group, married, spouse } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        role,
        position,
        group,
        married,
        spouse: married ? { ...spouse } : undefined,
      },
      { new: true }
    );

    if (!updatedMember)
      return res.status(404).json({ message: 'Member not found' });
    res
      .status(200)
      .json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember)
      return res.status(404).json({ message: 'Member not found' });
    res
      .status(200)
      .json({ message: 'Member deleted successfully', member: deletedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
};

export const addContribution = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { tag_id, amount, forSpouse = false } = req.body;

    // Find member
    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    // Find event by tag_id
    const event = await Event.findOne({ tag_id });
    if (!event)
      return res
        .status(404)
        .json({ message: 'Event not found with this tag_id' });

    const contribution = { event: event._id, amount, paidAt: new Date() };

    if (forSpouse) {
      if (!member.married)
        return res.status(400).json({ message: 'Member is not married' });
      member.spouse.contributions.push(contribution);
    } else {
      member.contributions.push(contribution);
      // Automatically add to spouse if married
      if (member.married) {
        member.spouse.contributions.push({ ...contribution });
      }
    }

    await member.save();
    res
      .status(200)
      .json({ message: 'Contribution added successfully', member });
  } catch (error) {
    res.status(500).json({ message: 'Error adding contribution', error });
  }
};