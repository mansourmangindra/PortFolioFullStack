using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Common;
using Portfolio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IRepository<Project> _projectRepository;

        public ProjectService(IRepository<Project> projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync(CancellationToken cancellationToken = default)
        {
            var projects = await _projectRepository.GetAllAsync(cancellationToken);
            return projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                LongDescription = p.LongDescription,
                ThumbnailUrl = p.ThumbnailUrl,
                Technologies = p.Technologies,
                GithubLink = p.GithubLink,
                LiveDemoLink = p.LiveDemoLink,
                IsFeatured = p.IsFeatured,
                DisplayOrder = p.DisplayOrder
            });
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            var p = await _projectRepository.GetByIdAsync(id, cancellationToken);
            if (p == null) return null;

            return new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                LongDescription = p.LongDescription,
                ThumbnailUrl = p.ThumbnailUrl,
                Technologies = p.Technologies,
                GithubLink = p.GithubLink,
                LiveDemoLink = p.LiveDemoLink,
                IsFeatured = p.IsFeatured,
                DisplayOrder = p.DisplayOrder
            };
        }

        public async Task<ProjectDto> CreateProjectAsync(UpsertProjectDto dto, CancellationToken cancellationToken = default)
        {
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                LongDescription = dto.LongDescription,
                ThumbnailUrl = dto.ThumbnailUrl,
                Technologies = dto.Technologies,
                GithubLink = dto.GithubLink,
                LiveDemoLink = dto.LiveDemoLink,
                IsFeatured = dto.IsFeatured,
                DisplayOrder = dto.DisplayOrder
            };

            await _projectRepository.AddAsync(project, cancellationToken);

            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                LongDescription = project.LongDescription,
                ThumbnailUrl = project.ThumbnailUrl,
                Technologies = project.Technologies,
                GithubLink = project.GithubLink,
                LiveDemoLink = project.LiveDemoLink,
                IsFeatured = project.IsFeatured,
                DisplayOrder = project.DisplayOrder
            };
        }

        public async Task UpdateProjectAsync(string id, UpsertProjectDto dto, CancellationToken cancellationToken = default)
        {
            var existing = await _projectRepository.GetByIdAsync(id, cancellationToken);
            if (existing == null) throw new KeyNotFoundException($"Project with ID {id} not found.");

            existing.Title = dto.Title;
            existing.Description = dto.Description;
            existing.LongDescription = dto.LongDescription;
            existing.ThumbnailUrl = dto.ThumbnailUrl;
            existing.Technologies = dto.Technologies;
            existing.GithubLink = dto.GithubLink;
            existing.LiveDemoLink = dto.LiveDemoLink;
            existing.IsFeatured = dto.IsFeatured;
            existing.DisplayOrder = dto.DisplayOrder;

            await _projectRepository.UpdateAsync(id, existing, cancellationToken);
        }

        public async Task DeleteProjectAsync(string id, CancellationToken cancellationToken = default)
        {
            await _projectRepository.DeleteAsync(id, cancellationToken);
        }
    }
}
