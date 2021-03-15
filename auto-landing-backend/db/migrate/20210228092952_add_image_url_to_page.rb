class AddImageUrlToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :image_url, :string
  end
end
