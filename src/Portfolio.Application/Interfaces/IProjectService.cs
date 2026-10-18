using Portfolio.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjectsAsync(CancellationToken cancellationToken = default);
        Task<ProjectDto?> GetProjectByIdAsync(string id, CancellationToken cancellationToken = default);
        Task<ProjectDto> CreateProjectAsync(UpsertProjectDto dto, CancellationToken cancellationToken = default);
        Task UpdateProjectAsync(string id, UpsertProjectDto dto, CancellationToken cancellationToken = default);
        Task DeleteProjectAsync(string id, CancellationToken cancellationToken = default);
    }
}
