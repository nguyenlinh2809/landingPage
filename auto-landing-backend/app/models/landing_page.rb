class LandingPage < ApplicationRecord
  belongs_to :category
  mount_uploader :image_url, ImageUploader

  validates_presence_of :content_json, :category_id
end
