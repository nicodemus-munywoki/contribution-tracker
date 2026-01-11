import Event from '../models/Event.model.js';

/**
 * GET all events
 */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No events found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      events,
    });
  } catch (error) {
    console.error('Get events error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching events',
    });
  }
};

/**
 * CREATE event
 */
export const createEvent = async (req, res) => {
  try {
    const { tag_id, host, description, date, location } = req.body;

    if (!tag_id || !host || !description || !date || !location) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const event = await Event.create({
      tag_id,
      host,
      description,
      date,
      location,
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create event error:', error.message);

    // Handle duplicate tag_id
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Event with this tag_id already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
    });
  }
};

/**
 * UPDATE event
 */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Update event error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error while updating event',
    });
  }
};

/**
 * DELETE event
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error while deleting event',
    });
  }
};
