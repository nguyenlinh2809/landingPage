class AddCategoryIdToLandingPage < ActiveRecord::Migration[5.1]
  def change
    add_column :landing_pages, :category_id, :integer
  end
end
