class ItemCategorySerializer < ActiveModel::Serializer
    attributes :id, :name, :description
    belongs_to :activity, include: :all
    has_many :item_models, serializer: ItemModelSerializer
end