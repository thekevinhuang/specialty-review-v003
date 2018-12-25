class RatingSerializer < ActiveModel::Serializer
    attributes :id, :rating, :description
    belongs_to :user, :item_model_characteristic
end