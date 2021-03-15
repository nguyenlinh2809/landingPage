class Category < ApplicationRecord
  has_many :landing_pages

  validates_presence_of :name, :code
end
