// controllers/campaignController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCampaign = async (req, res) => {
    try {
        const { title, description, goal, deadline, status } = req.body;
      console.log(title,description,goal,deadline,status);
        if (!title || !description || !goal || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
          
          const newCampaign = await prisma.campaign.create({
            data: {
              title,
              description,
              goal: parseInt(goal),
              deadline,
                status,
              userId: req.user.id,
              currentAmount: 0, 
            },
          });
        
        res.status(201).json({
          success: true,
          message: 'Campaign created successfully!',
            campaign: {
                id: newCampaign.id,
                title: newCampaign.title,
                description: newCampaign.description,
                goal: newCampaign.goal,
                currentAmount: newCampaign.currentAmount,
                deadline: newCampaign.deadline,
              status:newCampaign.status
            }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Failed to create campaign.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }
};
  const getAllCampaigns = async (req, res) => {
      try {
          const campaigns = await prisma.campaign.findMany();
          res.status(200).json({
              success: true,
              message: 'Campaigns fetched successfully',
              campaigns
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({
              success: false,
              message: 'Failed to fetch campaigns',
              error: process.env.NODE_ENV === 'development' ? error.message : undefined,
          });
      }
  };
module.exports = { createCampaign, getAllCampaigns };