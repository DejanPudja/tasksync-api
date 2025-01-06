'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW task_details_view AS
      SELECT 
          t.id AS task_id,
          t.name AS task_name,
          t.link AS task_link,
          t.description AS task_description,
          t.project_id,
          p.name AS project_name,
          t.user_id AS created_by_user_id,
          cu.name AS created_by_user_name,
          td.assigned_to AS assigned_user_id,
          au.name AS assigned_user_name,
          td.tags,
          td.estimated_time,
          td.tracked_time,
          td.due_date,
          td.type AS task_type,
          td.status AS task_status,
          td.priority AS task_priority,
          td.release AS task_release,
          t.parent_id AS parent_task_id
      FROM 
          tasks t
      LEFT JOIN 
          task_details td ON t.id = td.task_id
      LEFT JOIN 
          projects p ON t.project_id = p.id
      LEFT JOIN 
          users cu ON t.user_id = cu.id
      LEFT JOIN 
          users au ON td.assigned_to = au.id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS task_details_view;
    `);
  }
};
